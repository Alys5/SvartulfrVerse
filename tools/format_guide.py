import re

def is_date(line):
    return re.match(r'^\d{2}/\d{2}/\d{4}$', line.strip())

def format_guide(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.read().split('\n')
        
    formatted_lines = []
    skip_next = False
    in_table = False
    table_type = 0
    
    for i, line in enumerate(lines):
        if skip_next:
            skip_next = False
            continue
            
        stripped = line.strip()
        
        # Remove wiki artifacts
        if stripped in ["Page Contents", "Last edited by", "NevDev"] or is_date(stripped):
            continue
            
        # Detect Tables
        if stripped == "Field Purpose":
            formatted_lines.append("\n| Field | Purpose |")
            formatted_lines.append("|-------|---------|")
            in_table = True
            table_type = 1
            continue
            
        if stripped == "Field label in the editor What it does" or stripped == "Field What it does":
            formatted_lines.append("\n| Field | What it does |")
            formatted_lines.append("|-------|--------------|")
            in_table = True
            table_type = 2
            continue
            
        if in_table:
            # End of table heuristics (empty line, or another header)
            if not stripped or stripped.startswith("###") or stripped.startswith("##") or stripped.startswith("---"):
                in_table = False
            else:
                if table_type == 1:
                    # e.g. "World Name What users see in search results"
                    parts = stripped.split(' ', 2)
                    if len(parts) >= 3 and (parts[0] + " " + parts[1]) in ["World Name"]:
                        formatted_lines.append(f"| {parts[0]} {parts[1]} | {parts[2]} |")
                    elif len(parts) > 1:
                        # try to split by the first few uppercase words or commas
                        match = re.match(r'^([\w\s,]+)\s+([A-Z].*)$', stripped)
                        if match:
                            formatted_lines.append(f"| {match.group(1).strip()} | {match.group(2).strip()} |")
                        else:
                            formatted_lines.append(f"| {stripped} | |")
                elif table_type == 2:
                    match = re.match(r'^([\w\s&]+)\s+([A-Z].*)$', stripped)
                    if match:
                        formatted_lines.append(f"| {match.group(1).strip()} | {match.group(2).strip()} |")
                    else:
                        formatted_lines.append(f"| {stripped} | |")
                continue
        
        # Detect subheaders
        # Criteria: Not starting with ##, not empty, no ending punctuation, length < 60
        if stripped and not stripped.startswith('#') and not stripped.startswith('-') and not stripped.startswith('>'):
            if not stripped[-1] in ['.', '?', ':', '!', ';'] and len(stripped) < 70:
                # Make sure it's not a continuation of a sentence
                prev_line = lines[i-1].strip() if i > 0 else ""
                if not prev_line or prev_line.endswith('.') or prev_line.startswith('#'):
                    formatted_lines.append(f"### {stripped}")
                    continue
                    
        formatted_lines.append(line)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(formatted_lines))
        
if __name__ == "__main__":
    format_guide(r"d:\SvartulfrVerse\Guide_World.md")
