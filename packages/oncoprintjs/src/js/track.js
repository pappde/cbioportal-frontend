var _ = require('underscore');
var d3 = require('d3');
var $ = require('jquery');
var D3SVGCellRenderer = require('./d3_svg_cell_renderer');
var utils = require('./utils');

module.exports = {};

var defaultTrackConfig = {
	label: 'Gene',
	id_member: 'sample',
	cell_height: 20,
	track_height: 20,
	track_padding: 2.5,
}; 

function Track(name, oncoprint, data, config) {
	var self = this;
	self.name = name;
	self.config = $.extend({}, defaultTrackConfig, config || {}); // inherit from default
	
	self.oncoprint = oncoprint;
	self.data = data;

	if (self.oncoprint.config.render === 'table') {
		self.renderer = new TrackTableRenderer(self, new D3SVGCellRenderer(self));
	}

	self.getLabel = function() {
		// TODO: label decorations
		return self.config.label;
	};
	
	self.getDatumIds = function(sort_cmp) {
		// if sort_cmp is undefined, the order is unspecified
		// otherwise, it's the order given by sorting by sort_cmp
		var id_member = self.config.id_member;
		if (sort_cmp) {
			self.data = utils.stableSort(self.data, sort_cmp);
		}
		return _.map(self.data, function(d) { return d[id_member];});
	};

	self.useRenderTemplate = function(templName, params) {
		self.renderer.useTemplate(templName, params);
	};
}

function TrackTableRenderer(track, cellRenderer) {
	// coupled with OncoprintTableRenderer
	var self = this;
	self.track = track;
	self.cellRenderer = cellRenderer;
	self.row;
	self.$row;

	self.renderTrack = function(row) {
		self.row = row;
		self.$row = $(self.row.node());
		var label_area = row.append('td').classed('track_label', true);
		var cell_area = row.append('td').classed('track_cells', true);
		self.renderLabel(label_area);
		self.renderCells(cell_area)
	};

	self.renderLabel = function(label_area) {
		label_area.selectAll('*').remove();
		label_area.append('p').text(self.track.getLabel());
	};

	self.renderCells = function(cell_area) {
		self.cellRenderer.renderCells(cell_area);
	};

	self.useTemplate = function(templName, params) {
		self.cellRenderer.useTemplate(templName, params);
	};

	$(self.track.oncoprint).on('sort.oncoprint set_cell_width.oncoprint set_cell_padding.oncoprint', function() {
		self.cellRenderer.updateCells();
	});
}
module.exports.Track = Track;