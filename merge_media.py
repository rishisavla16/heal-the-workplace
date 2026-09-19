import sys

def merge_media(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    mq_900_start = content.find('@media (max-width: 900px) {')
    if mq_900_start == -1:
        print("Could not find 900px mq")
        return
    
    mq_880_start = content.find('@media (max-width: 880px) {')
    if mq_880_start == -1:
        print("Could not find 880px mq")
        return
        
    mq_880_content = content[mq_880_start + len('@media (max-width: 880px) {'):].strip()
    if mq_880_content.endswith('}'):
        mq_880_content = mq_880_content[:-1].strip()

    brace_count = 0
    in_mq_900 = False
    mq_900_end_idx = -1
    for i in range(mq_900_start, len(content)):
        if content[i] == '{':
            brace_count += 1
            in_mq_900 = True
        elif content[i] == '}':
            brace_count -= 1
            if in_mq_900 and brace_count == 0:
                mq_900_end_idx = i
                break
                
    if mq_900_end_idx == -1:
        print("Could not find end of 900px block")
        return
        
    merged_content = (
        content[:mq_900_end_idx] +
        "\n\n  /* Merged from 880px */\n  " +
        mq_880_content + "\n" +
        content[mq_900_end_idx:mq_880_start].rstrip() + "\n"
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(merged_content)

if __name__ == "__main__":
    merge_media("styles.css")
