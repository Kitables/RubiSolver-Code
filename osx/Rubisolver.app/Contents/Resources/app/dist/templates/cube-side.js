var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<h2>"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n\n<div class=\"row\">\n    <a data-cubie=\"1\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"2\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"3\" href=\"#\" class=\"cubie cubie-blank\"></a>\n</div>\n\n<div class=\"row\">\n    <a data-cubie=\"4\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"5\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"6\" href=\"#\" class=\"cubie cubie-blank\"></a>\n</div>\n\n<div class=\"row\">\n    <a data-cubie=\"7\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"8\" href=\"#\" class=\"cubie cubie-blank\"></a>\n    <a data-cubie=\"9\" href=\"#\" class=\"cubie cubie-blank\"></a>\n</div>\n";
},"useData":true});