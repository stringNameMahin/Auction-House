interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  placeholder?: string;
}

export function Input({ id, type = "text", placeholder, ...props }: InputProps) {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    );
  }