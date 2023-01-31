
import Swal from "sweetalert2";

export default function ShowLoading() {
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    showConfirmButton: false,
    timer: 2500,
    willOpen: () => {
      Swal.showLoading();
    },
  });
}
