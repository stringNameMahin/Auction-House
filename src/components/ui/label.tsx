interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export default function Label({ htmlFor, children }: LabelProps) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    );
  }
  