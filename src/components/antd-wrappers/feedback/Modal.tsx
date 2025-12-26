import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd';

export type ModalProps = AntModalProps;

/**
 * Enhanced Modal wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Modal API
 * - Default centered for better UX
 * - Preserves all static methods (Modal.confirm, Modal.info, etc.)
 * 
 * @example
 * ```tsx
 * <Modal title="Modal Title" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
 *   <p>Modal content</p>
 * </Modal>
 * ```
 */
export const Modal: typeof AntModal = ((props: ModalProps) => {
    const { centered = true, ...rest } = props;
    return <AntModal centered={centered} {...rest} />;
}) as any;

// Preserve static methods
Modal.info = AntModal.info;
Modal.success = AntModal.success;
Modal.error = AntModal.error;
Modal.warning = AntModal.warning;
Modal.confirm = AntModal.confirm;
Modal.destroyAll = AntModal.destroyAll;
Modal.useModal = AntModal.useModal;
Modal.config = AntModal.config;
