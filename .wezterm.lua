-- Pull in the wezterm API
local wezterm = require 'wezterm'

-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices.

-- For example, changing the initial geometry for new windows:
config.initial_cols = 120
config.initial_rows = 28

config.window_background_opacity = 0.8
config.hide_tab_bar_if_only_one_tab = true
config.window_decorations = "RESIZE"

-- or, changing the font size and color scheme.
config.font = wezterm.font("Hack Nerd Font", { weight = "Regular" })
config.max_fps = 120
config.color_scheme = 'rose-pine-moon'

config.window_frame = {
    font = wezterm.font("Hack Nerd Font", { weight = "Bold" }),
}

config.keys = {
  { key = 'x', mods = 'CTRL|SHIFT',
    action = wezterm.action.CloseCurrentPane { confirm = true } },
}

-- Finally, return the configuration to wezterm:
return config