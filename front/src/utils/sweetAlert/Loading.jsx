import Swal from "sweetalert2";
export default function Loading() {

  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    showConfirmButton: false,
    timer: 800,
    willOpen: () => {
    Swal.showLoading();
    },
  });
}




