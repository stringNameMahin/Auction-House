interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  placeholder?: string;
}

export function Textarea({ id, placeholder, ...props }: TextareaProps) {
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      ></textarea>
    );
  }
  