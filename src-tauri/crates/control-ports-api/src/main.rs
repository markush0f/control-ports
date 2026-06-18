use axum::{
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use std::env;
use tokio::net::TcpListener;

#[derive(Serialize)]
struct HealthResponse {
    ok: bool,
}

#[derive(Serialize)]
struct KillResponse {
    ok: bool,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

struct ApiError(String);

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse { error: self.0 }),
        )
            .into_response()
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()),
        )
        .init();

    let address =
        env::var("CONTROL_PORTS_API_ADDR").unwrap_or_else(|_| "127.0.0.1:3001".to_string());
    let app = Router::new()
        .route("/health", get(health))
        .route("/ports", get(list_ports))
        .route("/processes/:pid/kill", post(kill_process));

    let listener = TcpListener::bind(&address).await?;
    println!("control-ports-api listening on http://{address}");

    axum::serve(listener, app).await?;
    Ok(())
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse { ok: true })
}

async fn list_ports() -> Result<Json<Vec<control_ports_core::PortEntry>>, ApiError> {
    control_ports_core::list_ports().map(Json).map_err(ApiError)
}

async fn kill_process(Path(pid): Path<String>) -> Result<Json<KillResponse>, ApiError> {
    control_ports_core::kill_process(pid).map_err(ApiError)?;
    Ok(Json(KillResponse { ok: true }))
}
