export const deleteScroll = (scrollDelete: boolean) => {
  if (scrollDelete) {
    document.body.classList.add('body-no-scroll');
  } else {
    document.body.classList.remove('body-no-scroll');
  }
};