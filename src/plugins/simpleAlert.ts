import Swal, { SweetAlertOptions } from "sweetalert2";
const initial: SweetAlertOptions = {
  showClass: {
    popup: "animate__animated animate__fadeInDown",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutUp",
  },
  confirmButtonText: "確定",
  cancelButtonText: "取消",
};

const swal = (config: SweetAlertOptions) => {
  return Swal.fire({
    ...initial,
    ...config,
  });
};

export default swal;
