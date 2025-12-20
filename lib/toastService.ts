import { Toast } from "primereact/toast";
import { RefObject } from "react";

class ToastService {
  private toastRef: RefObject<Toast> | null = null;

  register(ref: RefObject<Toast>) {
    this.toastRef = ref;
  }

  error(summary: string, detail?: string) {
    this.toastRef?.current?.show({
      severity: "error",
      summary,
      detail,
      life: 5000,
    });
  }

  success(summary: string, detail?: string) {
    this.toastRef?.current?.show({
      severity: "success",
      summary,
      detail,
      life: 3000,
    });
  }

  warn(summary: string, detail?: string) {
    this.toastRef?.current?.show({
      severity: "warn",
      summary,
      detail,
      life: 4000,
    });
  }
}

export const toastService = new ToastService();
