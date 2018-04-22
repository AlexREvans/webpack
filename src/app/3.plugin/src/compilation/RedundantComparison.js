class RedundantComparisonPlugin {

  apply(compiler) {

    var isRawBool = (node) => node && (node.value === true || node.value === false)

    var isBooleanComparison = (op) => !![
      "==", "===", "!==", "!="
    ].find(t => t === op)

    var stringer = (node) => {
      switch (node.type) {
        case 'Identifier': return node.name
        case 'Literal': return node.value
        case 'BinaryExpression': return stringer(node.left) + node.operator + stringer(node.right)
        case 'CallExpression': return node.name + "(" + node.arguments.map(stringer) + ")"
      }
      return "todo"
    }

    var badNodeTest = (compilation, astCondExpressionNode) => {
      var node = astCondExpressionNode;

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
    compiler.plugin("compilation", (compilation, data) => {
      data.normalModuleFactory.plugin("parser", (parser, options) => {
        parser.plugin("statement if", expr => badNodeTest(compilation, expr.test));
      });
    });

  }
}

module.exports = RedundantComparisonPlugin