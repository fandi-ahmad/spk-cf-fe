export const closeModal = (modalRef: any) => {
  if (modalRef.current) {
    modalRef.current.close();
  }
};