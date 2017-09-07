function LoggingPlugin(options) { }


LoggingPlugin.prototype.apply = function (compiler) {

  var rawBool = (node) => node && (node.value === true || node.value === false)

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

  var badNodeTest = astCondExpressionNode => {
    var node = astCondExpressionNode;

    if (node.type === "BinaryExpression" && isBooleanComparison(node.operator)) {

      if (rawBool(node.left) || rawBool(node.right)) {
        console.log("==============================")
        console.log("==FOUND ONE!!! ===============")
        console.log(stringer(node))
        console.log("==============================")
      }

      return true;
    }

    switch (node.type) {
      // Recurse on node type
      /* case 'Identifier': return node.name 
      case 'Literal': return node.value
      case 'BinaryExpression': return stringer(node.left) + node.operator + stringer(node.right) */
    }

  }


  compiler.parser.plugin("statement if", function (expr) {
    var doesExpressionContainRedundantComparison = badNodeTest(expr.test);
    return false;
  });
}

module.exports = LoggingPlugin;