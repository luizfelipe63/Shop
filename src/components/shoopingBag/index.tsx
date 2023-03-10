import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ProductBag } from '../productBag'
import { 
  CheckoutButton, 
  CloseButton, 
  Content, 
  ContentInfos, 
  ContentProduct, 
  Overlay, 
  QuantityOfItems, 
  Title, 
  TotalValue 
} from './styles'


export function ShoopingBag(){
  return(
    <Dialog.Portal>
      <Overlay/>
      <Content>
        <CloseButton>
          <X weight='bold' size={24}/>
        </CloseButton>
        <Title>
          Sacola de compras
        </Title>
       
        <ContentProduct>
          <ProductBag/>
          <ProductBag/>
          <ProductBag/>
        </ContentProduct>
        <ContentInfos>
          <QuantityOfItems>
            <span>Quantidades</span>
            <span>3 itens</span>
          </QuantityOfItems>
          <TotalValue>
            <strong>Valor total</strong>
            <strong>R$ 270,00</strong>
          </TotalValue>
          <CheckoutButton>Finalizar compra</CheckoutButton>
        </ContentInfos>
      </Content>
    </Dialog.Portal>
  )
}