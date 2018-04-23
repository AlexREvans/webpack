class RedundantComparisonPlugin {

  apply(compiler) {

    const isRawBool = (node) => node && (node.value === true || node.value === false)

    const isBooleanComparison = (op) => !![
      "==", "===", "!==", "!="
    ].find(t => t === op)

    const stringer = (node) => {
      switch (node.type) {
        case 'Identifier': return node.name
        case 'Literal': return node.value
        case 'BinaryExpression': return stringer(node.left) + node.operator + stringer(node.right)
        case 'CallExpression': return node.name + "(" + node.arguments.map(stringer) + ")"
      }
      return "todo"
    }

    const badNodeTest = (compilation, astCondExpressionNode) => {
      const node = astCondExpressionNode;

      if (
        node.type === "BinaryExpression" &&
        isBooleanComparison(node.operator) &&
        (isRawBool(node.left) || isRawBool(node.right))) {

        compilation.errors.push(new Error('Found a redundant comparison ' + stringer(node)))
        return true
      }

      switch (node.type) {
        // Recurse on node type
        default: return false
      }

    }


    const pluginName = "RedundantComparisonPlugin";

    // compiler.hooks.compilation.tap(pluginName, (compilation, data) => {
    //   data.normalModuleFactory.hooks.parser.tap(pluginName, (parser, options) => {
    //     parser.hooks["statement if"].tap(pluginName, expr => badNodeTest(compilation, expr.test));
    //   });
    // });


    // compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
    //   factory.hooks.parser.tap(pluginName, (parser) => {
    //     parser.hooks.statementIf.tap(pluginName, expr => badNodeTest(compilation, expr.test))
    //   })
    // });


    compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
      factory.hooks.parser.tap(pluginName, (parser, options) => {
        console.log(parser.hooks.someHook.tap);
      })
    })

    // compiler.plugin("compilation", (compilation, data) => {
    //   data.normalModuleFactory.plugin("parser", (parser, options) => {
    //     parser.plugin("statement if", expr => badNodeTest(compilation, expr.test));
    //   });
    // });

  }
}

module.exports = RedundantComparisonPlugin