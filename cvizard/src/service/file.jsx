import axios from "axios";

export async function uploadFile({ file }) {
  const formData = new FormData();
  formData.append("pdf_file", file);
  await axios.post("http://cvizard.com:8080/api/reader", formData);
}
