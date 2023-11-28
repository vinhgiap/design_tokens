require 'xcodeproj'

project_path = 'FigmaTokens/FigmaTokens.xcodeproj'
project = Xcodeproj::Project.open(project_path)
target = project.targets.first
isExitsfile = false
files = target.source_build_phase.files.to_a.map do |pbx_build_file|
    pbx_build_file.file_ref.real_path.to_s.include? "StyleDictionary.swift"

end.select do |isExits|
    puts isExits
end

if files.include?(true) == false  
    group = project.main_group["FigmaTokens"]["Components"]
    file = group.new_file("StyleDictionary.swift")
    target.add_file_references([file])
    project.save
end