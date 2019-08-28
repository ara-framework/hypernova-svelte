import hypernova, { serialize, load } from 'hypernova';
import { findNode, getData } from 'nova-helpers';

const mountComponent = (Component, node, data) => {
  return new Component({
    target: node,
    props: data,
    hydrate: true,
  });
};

export const renderInPlaceholder = (name, Component, id) => {
  const node = findNode(name, id);
  const data = getData(name, id);

  if (node && data) {
    mountComponent(Component, node, data);
  }
};

export const renderSvelte = (name, Component) => hypernova({
  server() {
    return (propsData) => {
      const { html } = Component.render(propsData);

      return serialize(name, html, propsData);
    };
  },

  client() {
    const payloads = load(name);
    if (payloads) {
      payloads.forEach((payload) => {
        const { node, data: propsData } = payload;

        return mountComponent(Component, node, propsData);
      });
    }

    return Component;
  },
});
