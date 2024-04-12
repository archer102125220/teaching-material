import asyncLoader from '@/utils/phet-core/asyncLoader';

// const utilsModules = {
//   ...import.meta.glob('@/utils/**/*.js'),
//   ...import.meta.glob('@/utils/**/*.ts')
// };

export class Initializer {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.simLauncherUnlockBrand = null;
    this.simLauncherUnlockLaunch = null;
  }

  async initGeometricOptics() {
    this.resetState();
    // await this.NodeInit();
    // await this.simLauncherInit();

    // await Promise.all(
    //   Object.keys(utilsModules).map((key) => utilsModules[key]())
    // );
  }

  async simLauncherInit() {
    this.simLauncherUnlockBrand = asyncLoader.createLock({ name: 'brand' });
    try {
      await import('@/utils/brand/adapted-from-phet/Brand');
      this.simLauncherUnlockBrand();
    } catch (err) {
      console.log(err);
    }
    this.simLauncherUnlockLaunch = asyncLoader.createLock({ name: 'launch' });
  }

  async NodeInit() {
    try {
      const NodeModule = await import('@/utils/scenery/nodes/Node');
      return NodeModule;
    } catch (error) {
      console.log(error);
    }
  }
}

export const initializer = new Initializer();

export default initializer;
