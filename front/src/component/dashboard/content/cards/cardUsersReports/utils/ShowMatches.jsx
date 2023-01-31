import Swal from "sweetalert2";

export default function ShowMatches(title) { 
  Swal.fire({
   title: title,
   text: 'Modal with a custom image.',
   imageAlt: 'Custom image',
  })


}

