import { RefObject } from "react";

export interface WeaponAttributes {
  id: number;
  weapon_name: string;
  skin_name: string;
  rarity: string;
  steam_image: string;
}

export interface RouletteAttributes {
  winner: WeaponAttributes;
  caseItems: WeaponAttributes[];
  rouletteContainerRef: RefObject<HTMLDivElement>;
  weaponsRef: RefObject<HTMLDivElement>;
  weaponsCount?: number;
  transitionDuration?: number;
  itemWidth?: number;
}

export class Weapon {
  id: number;
  weapon_name: string;
  skin_name: string;
  rarity: string;
  steam_image: string;

  constructor(id: number, attrs: WeaponAttributes) {
    this.id = id;
    this.weapon_name = attrs.weapon_name;
    this.skin_name = attrs.skin_name;
    this.rarity = attrs.rarity;
    this.steam_image = attrs.steam_image;
  }
}

export class RouletteClass {
  winner: WeaponAttributes;
  caseItems: WeaponAttributes[];
  rouletteWrapper: RefObject<HTMLDivElement>;
  weaponWrapper: RefObject<HTMLDivElement>;
  weapons: Weapon[];
  weaponsCount: number;
  weaponPrizeId: number;
  transitionDuration: number;
  itemWidth: number;

  constructor(attrs: RouletteAttributes) {
    this.winner = attrs.winner;
    this.caseItems = attrs.caseItems;
    this.weapons = [];
    this.rouletteWrapper = attrs.rouletteContainerRef;
    this.weaponWrapper = attrs.weaponsRef;
    this.weaponsCount = attrs.weaponsCount || 50;
    this.weaponPrizeId = this.randomRange(this.weaponsCount / 2, this.weaponsCount - 5);
    this.transitionDuration = attrs.transitionDuration || 10;
    this.itemWidth = attrs.itemWidth || 110;
  }

  private randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  set_weapons = () => {
    let weapons: Weapon[] = [];
    const caseItemsLength = this.caseItems.length;

    if (caseItemsLength === 0) {
      throw new Error('Error! No items in case.');
    }

    const set_weapon_actors = (from_i: number, to_i: number) => {
      let j = 0;
      const createdWeapons: Weapon[] = [];
      for (let i = from_i; i <= to_i; i++) {
        createdWeapons.push(new Weapon(i, this.caseItems[j]));
        j = (j === caseItemsLength - 1) ? 0 : j + 1;
      }
      this.shuffle(createdWeapons);
      return createdWeapons;
    };

    weapons = weapons.concat(set_weapon_actors(0, this.weaponPrizeId - 1));
    weapons[this.weaponPrizeId] = new Weapon(this.weaponPrizeId, this.winner);
    weapons = weapons.concat(set_weapon_actors(this.weaponPrizeId + 1, this.weaponsCount - 1));
    this.weapons = weapons;
  };

  spin = () => {
    let randStop = 0;
    // Removed unused screenWidth variable
    const el_weapon_width_1_2 = Math.floor(this.itemWidth / 2);
    const el_weapon_width_1_10 = Math.floor(this.itemWidth / 10);

    randStop = (this.weaponPrizeId - 2) * this.itemWidth + el_weapon_width_1_2 +
      this.randomRange(el_weapon_width_1_10, (8 * el_weapon_width_1_10)) + 40;

    const wrapper = this.weaponWrapper.current;
    if (wrapper) {
      wrapper.style.transition = `left ${this.transitionDuration}s ease-out`;
      
      setTimeout(() => {
        if (wrapper) {
          wrapper.style.left = `-${randStop}px`;
        }
      }, 100);
    }

    return this.weaponPrizeId;
  }
}