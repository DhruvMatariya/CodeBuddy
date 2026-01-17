export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> a1 = {2,7,11,15};
    auto r1 = twoSum(a1, 9);
    cout << "[" << r1[0] << "," << r1[1] << "]\\n";

    vector<int> a2 = {3,2,4};
    auto r2 = twoSum(a2, 6);
    cout << "[" << r2[0] << "," << r2[1] << "]\\n";

    vector<int> a3 = {3,3};
    auto r3 = twoSum(a3, 6);
    cout << "[" << r3[0] << "," << r3[1] << "]\\n";
}`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

print(twoSum([2, 7, 11, 15], 9))
print(twoSum([3, 2, 4], 6))
print(twoSum([3, 3], 6))`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15},9)));
        System.out.println(Arrays.toString(twoSum(new int[]{3,2,4},6)));
        System.out.println(Arrays.toString(twoSum(new int[]{3,3},6)));
    }
}`,
    },
    expectedOutput: {
      cpp: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
}

int main() {
    vector<char> a = {'h','e','l','l','o'};
    reverseString(a);
    for(char c: a) cout << c << ",";
    cout << "\\n";

    vector<char> b = {'H','a','n','n','a','h'};
    reverseString(b);
    for(char c: b) cout << c << ",";
}`,
      python: `def reverseString(s):
    pass

test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {}
    
    public static void main(String[] args) {
        char[] a = {'h','e','l','l','o'};
        reverseString(a);
        System.out.println(Arrays.toString(a));
        
        char[] b = {'H','a','n','n','a','h'};
        reverseString(b);
        System.out.println(Arrays.toString(b));
    }
}`,
    },
    expectedOutput: {
      cpp: "o,l,l,e,h\nh,a,n,n,a,H",
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
      notes: ["Return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
      },
      {
        input: 's = "race a car"',
        output: "false",
      },
      {
        input: 's = " "',
        output: "true",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    return false;
}

int main() {
    cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << "\\n";
    cout << (isPalindrome("race a car") ? "true" : "false") << "\\n";
    cout << (isPalindrome(" ") ? "true" : "false") << "\\n";
}`,
      python: `def isPalindrome(s):
    pass

print(isPalindrome("A man, a plan, a canal: Panama"))
print(isPalindrome("race a car"))
print(isPalindrome(" "))`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println(isPalindrome("race a car"));
        System.out.println(isPalindrome(" "));
    }
}`,
    },
    expectedOutput: {
      cpp: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> a = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(a) << "\\n";
    cout << maxSubArray(vector<int>{1}) << "\\n";
    cout << maxSubArray(vector<int>{5,4,-1,7,8}) << "\\n";
}`,
      python: `def maxSubArray(nums):
    pass

print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
print(maxSubArray([1]))
print(maxSubArray([5,4,-1,7,8]))`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
        System.out.println(maxSubArray(new int[]{1}));
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8}));
    }
}`,
    },
    expectedOutput: {
      cpp: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      notes: [],
    },
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["2 ≤ n ≤ 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    return 0;
}

int main() {
    cout << maxArea(vector<int>{1,8,6,2,5,4,8,3,7}) << "\\n";
    cout << maxArea(vector<int>{1,1}) << "\\n";
}`,
      python: `def maxArea(height):
    pass

print(maxArea([1,8,6,2,5,4,8,3,7]))
print(maxArea([1,1]))`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7}));
        System.out.println(maxArea(new int[]{1,1}));
    }
}`,
    },
    expectedOutput: {
      cpp: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },
};

export const LANGUAGE_CONFIG = {
  cpp: {
    name: "C++ (C++17)",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};
