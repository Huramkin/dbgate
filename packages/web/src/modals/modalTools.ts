import { useAppStore } from '@/stores/appStore';
import { v4 as uuidv4 } from 'uuid';

export function showModal(ModalComponent: React.ComponentType<any>, props: any = {}) {
  const id = uuidv4();
  const store = useAppStore.getState();
  store.updateOpenedModals((modals) => [
    ...modals,
    { id, component: ModalComponent, props },
  ]);
}

export function closeModal(id: string) {
  const store = useAppStore.getState();
  store.updateOpenedModals((modals) => modals.filter((m) => m.id !== id));
}

export function closeCurrentModal() {
  const store = useAppStore.getState();
  store.updateOpenedModals((modals) => modals.slice(0, -1));
}
