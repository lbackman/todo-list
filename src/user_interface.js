export function userInterface() {
  const openModal = function(modal) {
    modal.style.display = "block"
  }

  const closeModal = function(modal, objectCreated = true) {
    if (objectCreated) {
      modal.querySelector('form').reset()
    }
    modal.style.display = "none"
  }

  return { openModal, closeModal }
}
