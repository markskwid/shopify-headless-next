const TOAST_STYLES = {
  success: "border-green-500",
  error: "border-red-500",
  warning: "border-yellow-500",
};

export default function Toast({ toasts }: { toasts: [] }) {
  return (
    <div className="min-w-52 max-w-100 fixed right-10 bottom-10 w-auto py-4 px-5 bg-white border-l-10 border-green-500 shadow-2xl/50 rounded-lg animate">
      <strong className="text-xl">Success!</strong>
      <p className="block text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </div>
  );
}
