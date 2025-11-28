import styled from "styled-components";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 25rem;
  max-height: 100vh;
  overflow: auto;
  background-color: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 4rem 5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #c3c3c366;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: #474747;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #868686;
  }
`;

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        {children}
        <Button onClick={onClose}>X</Button>
      </StyledModal>
    </Overlay>
  );
}
