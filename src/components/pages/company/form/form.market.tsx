import { FormProps, Modal, ModalProps } from "antd";
import { CompanyMarketItem } from "../../../../domain/models/company";
import FormMarketUI from "./form.market.ui";

export interface FormMarketProps {
  modalProps: ModalProps;
  formProps: FormProps<CompanyMarketItem>;
}

export function FormMarket({
  modalProps,
  formProps,
}: Partial<FormMarketProps>): JSX.Element {
  return (
    <Modal maskClosable={false} footer={null} {...modalProps}>
      <FormMarketUI {...formProps} />
    </Modal>
  );
}
