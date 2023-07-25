import axios from "axios";

export async function uploadFile({ file }) {
  const formData = new FormData();
  formData.append("pdf_file", file);
  await axios.post("https://cvizard.com:8443/api/reader", formData);
}
