import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type Option = {
  value: string;
  label: string;
};

// Użyj generycznego typu T, który rozszerza FieldValues
type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  options: readonly Option[];
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
};

/**
 * SelectField
 *
 * Controlled select field wrapper used with `react-hook-form` that renders
 * a label, the styled `Select` control and validation errors. Accepts a
 * list of options and forwards value/changes to the form controller.
 *
 * @param {string} name - Field name in the form.
 * @param {string} label - Visible label text for the field.
 * @param {string} placeholder - Placeholder shown when no value selected.
 * @param {Array<{value:string,label:string}>} options - Options to render.
 * @param {any} control - `react-hook-form` control object.
 * @param {object} error - Validation error (if any).
 * @param {boolean} required - Whether the field is required.
 * @returns {JSX.Element} A labeled select field wired to react-hook-form.
 */
const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              {options.map((option) => (
                <SelectItem
                  value={option.value}
                  key={option.value}
                  className="focus:bg-gray-600 focus:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SelectField;
