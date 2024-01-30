import { AssetActive } from '../constants/assetActive';
import { AssetType } from '../constants/assetType';
import { AssetUbication } from '../constants/assetUbi';

interface AssetBaseTemplate {
  code: string;
  itemName: string;
  purchaseDate: Date;
  quantity: number;
  brand: string;
  model: string;
  color: string;
  serialNumber: string;
  invoice: string;
  provider: string;
  unitValue: number;
  totalValue: number;
  depreciationTime: number;
  residualValue: number;
  annualDepreciation: number;
  monthlyDepreciation: number;
  valueBooks: number;
  insured: number;
  state: AssetActive;
  active: boolean;
  responsible: string;
  ubication: AssetUbication; //
  type: AssetType; //
  observation: string;
}

interface AssetEETemplate extends AssetBaseTemplate {
  inches: string;
  processor: string;
  kitValue: number;
  speed: string;
  ram: string;
  hdd: string;
}

// interface AssetMETemplate extends AssetBaseTemplate {}
