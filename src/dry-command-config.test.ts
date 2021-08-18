// tslint:disable:no-unused-expression
// tslint:disable:no-any
import { expect } from 'chai';
// tslint:disable-next-line:no-require-imports
import { DryCommandConfig } from './dry-command-config';
import { KeepPackageJson } from './features/keep-package-json';

describe('dry-command-config', () => {
    it('check dry command config mapping', () => {
        const inArgs: string[] = ['init', '-f', '-D'];
        const cfg: DryCommandConfig = new DryCommandConfig(inArgs, null);
        const outArgs: string[] = cfg.getCommandProxyArgs();
        const outInstallParentArgs: string[] = cfg.getInstallParentCommandProxyArgs();

        expect(cfg.getPackagerDescriptor().getPackageManager()).to.be.equals('npm');
        expect(outArgs.length).to.be.equals(4);
        expect(outArgs[0]).to.be.equals('init');
        expect(outArgs[1]).to.be.equals('-f');
        expect(outArgs[2]).to.be.equals('--loglevel');
        expect(outArgs[3]).to.be.equals('info');
        expect(outInstallParentArgs.length).to.be.equals(2);
        expect(outInstallParentArgs[0]).to.be.equals('--loglevel');
        expect(outInstallParentArgs[1]).to.be.equals('info');

        expect(cfg.getOrderedStepsAndFeatures().some(f => f instanceof KeepPackageJson)).to.be.false
    });
    it('check dry command config mapping when --dry-keep-package-json is used', () => {
        const inArgs: string[] = ['init', '--dry-keep-package-json'];
        const cfg: DryCommandConfig = new DryCommandConfig(inArgs, null);
        const outArgs: string[] = cfg.getCommandProxyArgs();

        expect(cfg.getPackagerDescriptor().getPackageManager()).to.be.equals('npm');
        expect(outArgs.length).to.be.equals(1);
        expect(outArgs[0]).to.be.equals('init');

        expect(cfg.getOrderedStepsAndFeatures().some(f => f instanceof KeepPackageJson)).to.be.true
    });
    it('check dry command config mapping when --dry-packager is used', () => {
        const inArgs: string[] = ['init', '--dry-packager', 'yarn'];
        const cfg: DryCommandConfig = new DryCommandConfig(inArgs, null);
        const outArgs: string[] = cfg.getCommandProxyArgs();

        expect(cfg.getPackagerDescriptor().getPackageManager()).to.be.equals('yarn');
        expect(outArgs.length).to.be.equals(1);
        expect(outArgs[0]).to.be.equals('init');

        expect(cfg.getOrderedStepsAndFeatures().some(f => f instanceof KeepPackageJson)).to.be.false
    });
    it('check dry command config mapping when "keep-package-json" config is used', () => {
        const inArgs: string[] = ['init'];
        const cfg: DryCommandConfig = new DryCommandConfig(inArgs, { 'keep-package-json': 'true' });
        const outArgs: string[] = cfg.getCommandProxyArgs();

        expect(cfg.getPackagerDescriptor().getPackageManager()).to.be.equals('npm');
        expect(outArgs.length).to.be.equals(1);
        expect(outArgs[0]).to.be.equals('init');

        expect(cfg.getOrderedStepsAndFeatures().some(f => f instanceof KeepPackageJson)).to.be.true
    });
    it('check dry command config mapping when "packager" config is used', () => {
        const inArgs: string[] = ['init'];
        const cfg: DryCommandConfig = new DryCommandConfig(inArgs, { 'packager': 'yarn' });
        const outArgs: string[] = cfg.getCommandProxyArgs();

        expect(cfg.getPackagerDescriptor().getPackageManager()).to.be.equals('yarn');
        expect(outArgs.length).to.be.equals(1);
        expect(outArgs[0]).to.be.equals('init');

        expect(cfg.getOrderedStepsAndFeatures().some(f => f instanceof KeepPackageJson)).to.be.false
    });
});
