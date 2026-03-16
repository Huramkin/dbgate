import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { closeModal } from './modalTools';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ModalLayer() {
  const openedModals = useAppStore((s) => s.openedModals);

  return (
    <>
      {openedModals.map((modal) => {
        const ModalComponent = modal.component;
        return (
          <Dialog key={modal.id} open onOpenChange={() => closeModal(modal.id)}>
            <DialogContent>
              <ModalComponent {...modal.props} modalId={modal.id} />
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
