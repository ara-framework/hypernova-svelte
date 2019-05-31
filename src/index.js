import hypernova, { serialize, load } from 'hypernova';

export const something = {};

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

        return new Component({
          target: node,
          props: propsData,
          hydrate: true,
        });
      });
    }

    return Component;
  },
});
