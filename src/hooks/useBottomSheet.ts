import React, { ReactNode, useContext } from 'react';
import { SheetContext } from '../components/BottomSheet/BottomSheetProvider';
import { useSheetStore } from '../stores/sheet-stores';

export const useBottomSheet = () => {
   const { setSheetState } = useContext(SheetContext);
   const { setIsSheetOpen } = useSheetStore();

   const openSheet = ({ content, sheetName }: { content: ReactNode; sheetName?: string }) => {
      setIsSheetOpen(true);
      setSheetState({
         sheetName,
         content,
      });
   };

   return { openSheet };
};