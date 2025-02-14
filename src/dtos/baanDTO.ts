import { BaanCount } from '@/types/baan';
import {
  BaanSelection,
  GetBaanSelectionByGroupIdResponse,
  DeleteBaanResponse,
} from '@/types/BaanSelection';

export type BaanSelectionDTO = {
  baan_id: string;
  group_id: string;
  order: number;
};

export type GetBaanSelectionByGroupIdResponseDTO = {
  selection: BaanSelectionDTO[];
};

export type DeleteBaanResponseDTO = {
  baan_id: string;
  group_id: string;
};

export type BaanCountDTO = {
  baan_id: string;
  count: number;
};

export const convertBaanSelectionDTOToBaanSelection = (
  baanSelectionDTO: BaanSelectionDTO
): BaanSelection => {
  return {
    baanId: baanSelectionDTO.baan_id,
    groupId: baanSelectionDTO.group_id,
    order: baanSelectionDTO.order,
  };
};

export const convertGetBaanSelectionByGroupIdResponseDTOToResponse = (
  responseDTO: GetBaanSelectionByGroupIdResponseDTO
): GetBaanSelectionByGroupIdResponse => {
  return {
    baanSelections: responseDTO.selection.map(
      convertBaanSelectionDTOToBaanSelection
    ),
  };
};

export const convertDeleteBaanResponseDTOToResponse = (
  responseDTO: DeleteBaanResponseDTO
): DeleteBaanResponse => {
  return {
    baanId: responseDTO.baan_id,
    groupId: responseDTO.group_id,
  };
};

export const convertBaanCountDTOtoBaanCount = (
  baanCount: BaanCountDTO
): BaanCount => {
  return {
    baanId: baanCount.baan_id,
    count: baanCount.count,
  };
};
