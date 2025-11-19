import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * InputField
 *
 * Small wrapper used to render a labeled input wired to form helpers.
 * Renders the `Label`, the `Input` component and an optional error message.
 *
 * @param {string} name - Field name.
 * @param {string} label - Visible label text.
 * @param {string} placeholder - Input placeholder.
 * @param {string} type - Input type (default: `text`).
 * @param {Function} register - Form register function to attach input to form.
 * @param {object} error - Validation error object.
 * @param {object} validation - Validation rules for the input.
 * @param {boolean} disabled - Whether the input is disabled.
 * @param {string} value - Controlled value.
 * @returns {JSX.Element} Labeled input form field.
 */
const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  disabled,
  value,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn("form-input", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
export default InputField;
