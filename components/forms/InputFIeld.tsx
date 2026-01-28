import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";

export type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  validation?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  showValidationFeedback?: boolean;
  className?: string;
  helperText?: string;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  validation,
  type = "text",
  disabled = false,
  showValidationFeedback = true,
  className,
  helperText,
  value,
  ...props
}: InputFieldProps<T>) {
  const { onChange, onBlur, ...registerProps } = register(name, validation);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    props.onBlur?.(e);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={name}
          className={cn(
            "text-sm font-medium",
            error ? "text-red-400" : "text-gray-700 dark:text-gray-300",
          )}
        >
          {label}
        </Label>
        {validation?.required && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Required
          </span>
        )}
      </div>

      <div className="relative">
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : helperText ? `${name}-helper` : undefined
          }
          className={cn(
            "w-full transition-all duration-200",
            "focus:ring-2 focus:ring-offset-1",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/20"
              : "focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-500/20",
            disabled && "opacity-60 cursor-not-allowed",
            showValidationFeedback && "pr-10",
          )}
          {...registerProps}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />

        {showValidationFeedback && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {disabled ? (
              <AlertCircle className="h-4 w-4 text-gray-400" />
            ) : error ? (
              <XCircle className="h-4 w-4 text-red-500" />
            ) : value && value.toString().length > 0 ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : null}
          </div>
        )}
      </div>

      <div className="min-h-5">
        {error ? (
          <div
            id={`${name}-error`}
            role="alert"
            className="flex items-start gap-1 text-sm text-red-600 dark:text-red-400"
          >
            <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>{error.message}</span>
          </div>
        ) : helperText ? (
          <p
            id={`${name}-helper`}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
