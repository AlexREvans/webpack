class RedundantComparisonPlugin {

  apply(compiler) {

    // Plugins must be named in order to track progress
    const pluginName = "RedundantComparisonPlugin";

    // Take the compiler and tap into the compilation
    compiler.hooks.compilation

      // Extract the compilation and Module Factory for the compilation
      .tap(pluginName, (compilation, { normalModuleFactory }) => {

        // From the factory, tap into the javascript parser
        normalModuleFactory.hooks.parser.for('javascript/auto')
          .tap(pluginName, (parser) => {

            // Tap into occurences of if statements and test them for redundant comparisons
            parser.hooks.statementIf
              .tap(pluginName, expr => this.badNodeTest(compilation, expr.test));
          });

      });

  }



  badNodeTest(compilation, astCondExpressionNode) {

    const isRawBool = (node) => node && (node.value === true || node.value === false)

    const isBooleanComparison = (op) => !![
      "==", "===", "!==", "!="
    ].find(t => t === op)

    const stringer = (node) => {
      switch (node.type) {
        case 'Identifier':
          return node.name
        case 'Literal':
          return node.value
        case 'BinaryExpression':
          return stringer(node.left) + node.operator + stringer(node.right)
        case 'CallExpression':
          return node.name + "(" + node.arguments.map(stringer) + ")"
      }
      return "todo"
    }

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


}

module.exports = RedundantComparisonPlugin