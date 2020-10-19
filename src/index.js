const marked = require("marked");
const pluginutils = require("@rollup/pluginutils");

const ext = /\.md$/;

const parse = function (options = {}) {
  const filter = pluginutils.createFilter(
    options.include || ["**/*.md"],
    options.exclude
  );

  if (options.marked) marked.setOptions(options.marked);
  return {
    name: "md",

    transform(md, id) {
      if (!ext.test(id)) return null;
      if (!filter(id)) return null;

      const data = marked(md);
      return {
        code: `export default ${JSON.stringify(data.toString())};`,
        map: { mappings: "" },
      };
    },
  };
};

module.exports = parse;
