/* global module */
// @ts-check

/** @type {import('svgo').Config} */
const svgoConfig = {
  multipass: true,
  plugins: [
    /* adds attributes to an outer <svg> element */
    // {
    //   name: 'addAttributesToSVGElement',
    //   params: {},
    // },
    /* add classnames to an outer <svg> element */
    // {
    //   name: 'addClassesToSVGElement',
    //   params: {},
    // },
    /* cleanup attributes from newlines, trailing, and repeating spaces */
    {
      name: 'cleanupAttrs',
      params: {},
    },
    /* remove or cleanup enable-background attribute when possible */
    { name: 'cleanupEnableBackground' },
    /* remove unused and minify used IDs */
    {
      name: 'cleanupIds',
      params: {},
    },
    /* round numeric values in attributes that take a list of numbers (like viewBox or enable-background) */
    // {
    //   name: 'cleanupListOfValues',
    //   params: {},
    // },
    /* round numeric values to the fixed precision, remove default px units */
    {
      name: 'cleanupNumericValues',
      params: {},
    },
    /* collapse useless groups */
    { name: 'collapseGroups' },
    /* convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb) */
    {
      name: 'convertColors',
      params: {},
    },
    /* convert non-eccentric <ellipse> to <circle> */
    { name: 'convertEllipseToCircle' },
    /* convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more */
    {
      name: 'convertPathData',
      params: {},
    },
    /* convert some basic shapes to <path> */
    {
      name: 'convertShapeToPath',
      params: {},
    },
    /* convert styles into attributes */
    // {
    //   name: 'convertStyleToAttrs',
    //   params: {},
    // },
    /* collapse multiple transforms into one, convert matrices to the short aliases, and much more */
    {
      name: 'convertTransform',
      params: {},
    },
    /* move and merge styles from <style> elements to element style attributes */
    {
      name: 'inlineStyles',
      params: {},
    },
    /* merge multiple Paths into one */
    {
      name: 'mergePaths',
      params: {},
    },
    /* merge multiple style elements into one */
    { name: 'mergeStyles' },
    /* minify <style> elements content with CSSO */
    {
      name: 'minifyStyles',
      params: {},
    },
    /* move elements' attributes to their enclosing group */
    // { name: 'moveElemsAttrsToGroup' },
    /* move some group attributes to the contained elements */
    // { name: 'moveGroupAttrsToElems' },
    /* prefix IDs and classes with the SVG filename or an arbitrary string */
    // {
    //   name: 'prefixIds',
    //   params: {},
    // },
    /* removes attributes of elements that match a CSS selector */
    // {
    //   name: 'removeAttributesBySelector',
    //   params: {},
    // },
    /* remove attributes by pattern */
    // { name: 'removeAttrs' },
    /* remove comments */
    { name: 'removeComments' },
    /* remove <desc> */
    {
      name: 'removeDesc',
      params: {},
    },
    /* remove width/height and add viewBox if it's missing (opposite to removeViewBox, disable it first) */
    { name: 'removeDimensions' },
    /* remove doctype declaration */
    { name: 'removeDoctype' },
    /* remove editors namespaces, elements, and attributes */
    {
      name: 'removeEditorsNSData',
      params: {},
    },
    /* remove arbitrary elements by ID or className */
    // {
    //   name: 'removeElementsByAttr',
    //   params: {},
    // },
    /* remove empty attributes */
    { name: 'removeEmptyAttrs' },
    /* remove empty Container elements */
    { name: 'removeEmptyContainers' },
    /* remove empty Text elements */
    {
      name: 'removeEmptyText',
      params: {},
    },
    /* remove hidden elements */
    {
      name: 'removeHiddenElems',
      params: {},
    },
    /* remove <metadata> */
    { name: 'removeMetadata' },
    /* remove non-inheritable group's "presentation" attributes */
    { name: 'removeNonInheritableGroupAttrs' },
    /* removes elements that are drawn outside of the viewbox */
    // { name: 'removeOffCanvasPaths' },
    /* remove raster images */
    // { name: 'removeRasterImages' },
    /* remove <script> elements */
    // { name: 'removeScriptElement' },
    /* remove <style> elements */
    // { name: 'removeStyleElement' },
    /* remove <title> */
    { name: 'removeTitle' },
    /* remove unknown elements content and attributes, remove attributes with default values */
    {
      name: 'removeUnknownsAndDefaults',
      params: {},
    },
    /* remove unused namespaces declaration */
    { name: 'removeUnusedNS' },
    /* remove elements of <defs> without id */
    { name: 'removeUselessDefs' },
    /* remove useless stroke and fill attributes */
    {
      name: 'removeUselessStrokeAndFill',
      params: {},
    },
    /* remove viewBox attribute when possible */
    // { name: 'removeViewBox' },
    /* removes the xmlns attribute (for inline SVG) */
    // { name: 'removeXMLNS' },
    /* remove XML processing instructions */
    // { name: 'removeXMLProcInst' },
    /* Find duplicated elements and replace them with links */
    // { name: 'reusePaths' },
    /* sort element attributes for epic readability */
    // { name: 'sortAttrs' },
    /* sort children of <defs> in order to improve compression */
    // { name: 'sortDefsChildren' },
  ],
};

module.exports = { svgoConfig };
