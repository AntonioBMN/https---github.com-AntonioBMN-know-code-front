export const mountRequest = (object) => {
  const files = new FormData();
  let words = "";

  object.forEach((element, index) => {
    files.append(`file${index}`, element.file);
    words = `${words}${element.word}${index + 1 !== object.length ? "," : ""}`;
  });
  return { files, words };
};
