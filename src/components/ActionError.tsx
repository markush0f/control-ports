type ActionErrorProps = {
  message: string;
};

export function ActionError({ message }: ActionErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="m-5 rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-300">
      {message}
    </div>
  );
}
