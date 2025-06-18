import { toast } from "react-toastify";

export function info(message) {
  toast.info(message);
}

export function success(message) {
  toast.success(message);
}

export function warn(message) {
  toast.warn(message);
}

export function alert(message) {
  toast.error(message, {
    autoClose: false
  })
}
