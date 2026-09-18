import bpy
import math
import os
from mathutils import Vector

# Reconstructs the DGCity "Cubo azul" monument as an editable low-poly Blender asset.
# No cameras or lights are included.

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1.0

collection = bpy.data.collections.new("Cubo Azul - Monumento N1")
scene.collection.children.link(collection)

def hex_rgba(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i+2], 16) / 255.0 for i in (0, 2, 4)) + (1.0,)

materials = {}
def material(name, color, roughness=0.72, metallic=0.0, emission=0.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = hex_rgba(color)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = hex_rgba(color)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission > 0:
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = hex_rgba(color)
            bsdf.inputs["Emission Strength"].default_value = emission
        elif "Emission" in bsdf.inputs:
            bsdf.inputs["Emission"].default_value = hex_rgba(color)
            bsdf.inputs["Emission Strength"].default_value = emission
    materials[name] = m
    return m

MAT_BASE   = material("Base_Gray", "#a4aaa6")
MAT_STONE  = material("Stone", "#c9c7ba")
MAT_INSET  = material("Inset_Cream", "#e1dece")
MAT_BRONZE = material("Bronze_Teal", "#647b7c", roughness=0.55, metallic=0.35)
MAT_PLAQUE = material("Plaque_Lines", "#d4c9b6")
MAT_PDEST  = material("Cube_Pedestal", "#667f8d", roughness=0.60, metallic=0.12)
MAT_BLUE   = material("Blue_Cube", "#327cc2", roughness=0.48, metallic=0.25)
MAT_LAMP   = material("Lamp_Housing", "#53676b", roughness=0.48, metallic=0.35)
MAT_LIGHT  = material("Lamp_Light", "#fff0bc", roughness=0.35, emission=0.25)

def box(name, loc, dims, mat, rot=None):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc)
    o = bpy.context.object
    # Move from default collection into asset collection.
    for c in list(o.users_collection):
        c.objects.unlink(o)
    collection.objects.link(o)
    o.name = name
    o.dimensions = dims
    if rot is not None:
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = rot
    o.data.materials.append(mat)
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.select_set(False)
    return o

V = 1.30  # DGCity monument vertical scale

# Two-step stone base.
box("Base_Lower", (0, 0, 0.035*V), (0.90, 0.90, 0.07*V), MAT_BASE)
box("Base_Upper", (0, 0, 0.105*V), (0.65, 0.65, 0.07*V), MAT_STONE)
box("Base_Inset", (0, 0, 0.075*V), (0.79, 0.79, 0.035*V), MAT_INSET)

# Teal perimeter rails embedded in the plinth.
for side in (-1, 1):
    box(f"Rail_X_{side:+d}", (side*0.38, 0, 0.10*V), (0.022, 0.72, 0.04*V), MAT_BRONZE)
    box(f"Rail_Y_{side:+d}", (0, side*0.38, 0.10*V), (0.72, 0.022, 0.04*V), MAT_BRONZE)

# Front plaque with three engraved/light lines.
box("Plaque", (0, 0.183, 0.18*V), (0.19, 0.015, 0.09*V), MAT_BRONZE)
for k in range(3):
    box(f"Plaque_Line_{k+1}", (0, 0.194, (0.16+k*0.018)*V), (0.13, 0.006, 0.006*V), MAT_PLAQUE)

# Central support.
ped_z = 0.22*V
ped_h = 0.16*V
box("Central_Pedestal", (0, 0, ped_z), (0.24, 0.24, ped_h), MAT_PDEST)

# Signature cube, resting on one corner: local (1,1,1) body diagonal is vertical.
side = 0.43
corner_to_center = math.sqrt(3.0) * side / 2.0
ped_top = ped_z + ped_h/2.0
q = Vector((1,1,1)).normalized().rotation_difference(Vector((0,0,1)))
box("Blue_Corner_Cube", (0, 0, ped_top + corner_to_center), (side, side, side), MAT_BLUE, q)

# Two small lamps at the rear corners, matching DGCity decoration.
for side_sign in (-1, 1):
    box(f"Lamp_Base_{side_sign:+d}", (side_sign*0.36, 0.34, 0.12*V),
        (0.095, 0.095, 0.065*V), MAT_LAMP)
    box(f"Lamp_Glow_{side_sign:+d}", (side_sign*0.36, 0.34, 0.158*V),
        (0.065, 0.065, 0.012*V), MAT_LIGHT)

# Set clean asset metadata and origin-friendly scene settings.
scene["asset_name"] = "Cubo Azul - Monumento N1"
scene["source"] = "DGCity procedural geometry reconstruction"
scene["style"] = "low-poly"
scene.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'

# Select all asset meshes for convenience when opening the file.
bpy.ops.object.select_all(action='DESELECT')
for o in collection.objects:
    o.select_set(True)

out = os.path.abspath("Cubo_Azul_Monumento_N1.blend")
bpy.ops.wm.save_as_mainfile(filepath=out)
print("SAVED:", out)
