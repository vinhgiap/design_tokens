require 'xcodeproj'

project_path = 'FigmaTokens/FigmaTokens.xcodeproj'
project = Xcodeproj::Project.open(project_path)
#find the group on which you want to add the file
group = project.main_group["FigmaTokens"]["Components"]
#get the file reference for the file to add
file = group.new_file("StyleDictionary.swift")
#add the file reference to the projects first target
main_target = project.targets.first
main_target.add_file_references([file])
#finally, save the project
project.save