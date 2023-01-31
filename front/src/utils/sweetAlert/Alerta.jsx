
import Swal from "sweetalert2";

export default function Alerta(message,status,subMessage) {
  Swal.fire({
    icon: status,
    title: message,
     text: subMessage,
    showConfirmButton: false,
    timer: 2000,
  });
}
