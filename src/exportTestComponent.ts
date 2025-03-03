import {createBridgeComponent} from "@module-federation/bridge-vue3";
import ExportApp from "./TestComponent.vue";

export default createBridgeComponent({
    rootComponent: ExportApp,
    appOptions: () => {},
});
