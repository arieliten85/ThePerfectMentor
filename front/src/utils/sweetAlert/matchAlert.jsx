import Swal from "sweetalert2";
export default function matchAlert(title) {
Swal.fire({
    title: title,
    width: 600,
    padding: '3em',
    showConfirmButton: false,
    color: '#716add',
    timer: 2500,
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
    #BFD732A6
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  })   
}




