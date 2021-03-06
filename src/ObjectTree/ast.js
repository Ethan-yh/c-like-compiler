const ast = {
  "type": "Program",
  "loc": {
    "start": {
      "line": 1,
      "col": 1
    },
    "end": {
      "line": 38,
      "col": 2
    }
  },
  "body": [
    {
      "type": "VariableDeclaration",
      "loc": {
        "start": {
          "line": 1,
          "col": 1
        },
        "end": {
          "line": 1,
          "col": 7
        }
      },
      "id": {
        "type": "Identifier",
        "loc": {
          "start": {
            "line": 1,
            "col": 5
          },
          "end": {
            "line": 1,
            "col": 6
          }
        },
        "name": "a"
      },
      "kind": "int"
    },
    {
      "type": "VariableDeclaration",
      "loc": {
        "start": {
          "line": 2,
          "col": 1
        },
        "end": {
          "line": 2,
          "col": 7
        }
      },
      "id": {
        "type": "Identifier",
        "loc": {
          "start": {
            "line": 2,
            "col": 5
          },
          "end": {
            "line": 2,
            "col": 6
          }
        },
        "name": "b"
      },
      "kind": "int"
    },
    {
      "type": "FunctionDeclaration",
      "loc": {
        "start": {
          "line": 3,
          "col": 1
        },
        "end": {
          "line": 21,
          "col": 2
        }
      },
      "id": {
        "type": "Identifier",
        "loc": {
          "start": {
            "line": 3,
            "col": 5
          },
          "end": {
            "line": 3,
            "col": 12
          }
        },
        "name": "program"
      },
      "kind": "int",
      "params": [
        {
          "type": "Identifier",
          "loc": {
            "start": {
              "line": 3,
              "col": 13
            },
            "end": {
              "line": 3,
              "col": 18
            }
          },
          "id": {
            "type": "Identifier",
            "loc": {
              "start": {
                "line": 3,
                "col": 17
              },
              "end": {
                "line": 3,
                "col": 18
              }
            },
            "name": "a"
          },
          "kind": "int"
        },
        {
          "type": "Identifier",
          "loc": {
            "start": {
              "line": 3,
              "col": 19
            },
            "end": {
              "line": 3,
              "col": 24
            }
          },
          "id": {
            "type": "Identifier",
            "loc": {
              "start": {
                "line": 3,
                "col": 23
              },
              "end": {
                "line": 3,
                "col": 24
              }
            },
            "name": "b"
          },
          "kind": "int"
        },
        {
          "type": "Identifier",
          "loc": {
            "start": {
              "line": 3,
              "col": 25
            },
            "end": {
              "line": 3,
              "col": 30
            }
          },
          "id": {
            "type": "Identifier",
            "loc": {
              "start": {
                "line": 3,
                "col": 29
              },
              "end": {
                "line": 3,
                "col": 30
              }
            },
            "name": "c"
          },
          "kind": "int"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "loc": {
          "start": {
            "line": 4,
            "col": 1
          },
          "end": {
            "line": 21,
            "col": 2
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "loc": {
              "start": {
                "line": 5,
                "col": 1
              },
              "end": {
                "line": 5,
                "col": 7
              }
            },
            "id": {
              "type": "Identifier",
              "loc": {
                "start": {
                  "line": 5,
                  "col": 5
                },
                "end": {
                  "line": 5,
                  "col": 6
                }
              },
              "name": "i"
            },
            "kind": "int"
          },
          {
            "type": "VariableDeclaration",
            "loc": {
              "start": {
                "line": 6,
                "col": 1
              },
              "end": {
                "line": 6,
                "col": 7
              }
            },
            "id": {
              "type": "Identifier",
              "loc": {
                "start": {
                  "line": 6,
                  "col": 5
                },
                "end": {
                  "line": 6,
                  "col": 6
                }
              },
              "name": "j"
            },
            "kind": "int"
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 7,
                "col": 1
              },
              "end": {
                "line": 7,
                "col": 5
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 7,
                  "col": 1
                },
                "end": {
                  "line": 7,
                  "col": 5
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 7,
                    "col": 1
                  },
                  "end": {
                    "line": 7,
                    "col": 2
                  }
                },
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "loc": {
                  "start": {
                    "line": 7,
                    "col": 3
                  },
                  "end": {
                    "line": 7,
                    "col": 4
                  }
                },
                "value": "0"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 8,
                "col": 1
              },
              "end": {
                "line": 15,
                "col": 2
              }
            },
            "expression": {
              "type": "IfStatement",
              "loc": {
                "start": {
                  "line": 8,
                  "col": 1
                },
                "end": {
                  "line": 15,
                  "col": 2
                }
              },
              "test": {
                "type": "BinaryExpression",
                "loc": {
                  "start": {
                    "line": 8,
                    "col": 4
                  },
                  "end": {
                    "line": 8,
                    "col": 11
                  }
                },
                "left": {
                  "type": "Identifier",
                  "loc": {
                    "start": {
                      "line": 8,
                      "col": 4
                    },
                    "end": {
                      "line": 8,
                      "col": 5
                    }
                  },
                  "name": "a"
                },
                "operator": ">",
                "right": {
                  "type": "BinaryExpression",
                  "loc": {
                    "start": {
                      "line": 8,
                      "col": 7
                    },
                    "end": {
                      "line": 8,
                      "col": 10
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "loc": {
                      "start": {
                        "line": 8,
                        "col": 7
                      },
                      "end": {
                        "line": 8,
                        "col": 8
                      }
                    },
                    "name": "b"
                  },
                  "operator": "+",
                  "right": {
                    "type": "Identifier",
                    "loc": {
                      "start": {
                        "line": 8,
                        "col": 9
                      },
                      "end": {
                        "line": 8,
                        "col": 10
                      }
                    },
                    "name": "c"
                  }
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "loc": {
                  "start": {
                    "line": 9,
                    "col": 1
                  },
                  "end": {
                    "line": 11,
                    "col": 2
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "loc": {
                      "start": {
                        "line": 10,
                        "col": 1
                      },
                      "end": {
                        "line": 10,
                        "col": 13
                      }
                    },
                    "expression": {
                      "type": "AssignStatement",
                      "loc": {
                        "start": {
                          "line": 10,
                          "col": 1
                        },
                        "end": {
                          "line": 10,
                          "col": 13
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "loc": {
                          "start": {
                            "line": 10,
                            "col": 1
                          },
                          "end": {
                            "line": 10,
                            "col": 2
                          }
                        },
                        "name": "j"
                      },
                      "right": {
                        "type": "BinaryExpression",
                        "loc": {
                          "start": {
                            "line": 10,
                            "col": 3
                          },
                          "end": {
                            "line": 10,
                            "col": 12
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "loc": {
                            "start": {
                              "line": 10,
                              "col": 3
                            },
                            "end": {
                              "line": 10,
                              "col": 4
                            }
                          },
                          "name": "a"
                        },
                        "operator": "+",
                        "right": {
                          "type": "BinaryExpression",
                          "loc": {
                            "start": {
                              "line": 10,
                              "col": 6
                            },
                            "end": {
                              "line": 10,
                              "col": 11
                            }
                          },
                          "left": {
                            "type": "BinaryExpression",
                            "loc": {
                              "start": {
                                "line": 10,
                                "col": 6
                              },
                              "end": {
                                "line": 10,
                                "col": 9
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "loc": {
                                "start": {
                                  "line": 10,
                                  "col": 6
                                },
                                "end": {
                                  "line": 10,
                                  "col": 7
                                }
                              },
                              "name": "b"
                            },
                            "operator": "*",
                            "right": {
                              "type": "Identifier",
                              "loc": {
                                "start": {
                                  "line": 10,
                                  "col": 8
                                },
                                "end": {
                                  "line": 10,
                                  "col": 9
                                }
                              },
                              "name": "c"
                            }
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "loc": {
                              "start": {
                                "line": 10,
                                "col": 10
                              },
                              "end": {
                                "line": 10,
                                "col": 11
                              }
                            },
                            "value": "1"
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "alternate": {
                "type": "BlockStatement",
                "loc": {
                  "start": {
                    "line": 13,
                    "col": 1
                  },
                  "end": {
                    "line": 15,
                    "col": 2
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "loc": {
                      "start": {
                        "line": 14,
                        "col": 1
                      },
                      "end": {
                        "line": 14,
                        "col": 5
                      }
                    },
                    "expression": {
                      "type": "AssignStatement",
                      "loc": {
                        "start": {
                          "line": 14,
                          "col": 1
                        },
                        "end": {
                          "line": 14,
                          "col": 5
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "loc": {
                          "start": {
                            "line": 14,
                            "col": 1
                          },
                          "end": {
                            "line": 14,
                            "col": 2
                          }
                        },
                        "name": "j"
                      },
                      "right": {
                        "type": "Identifier",
                        "loc": {
                          "start": {
                            "line": 14,
                            "col": 3
                          },
                          "end": {
                            "line": 14,
                            "col": 4
                          }
                        },
                        "name": "a"
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 16,
                "col": 1
              },
              "end": {
                "line": 19,
                "col": 2
              }
            },
            "expression": {
              "type": "WhileStatement",
              "loc": {
                "start": {
                  "line": 16,
                  "col": 1
                },
                "end": {
                  "line": 19,
                  "col": 2
                }
              },
              "test": {
                "type": "BinaryExpression",
                "loc": {
                  "start": {
                    "line": 16,
                    "col": 7
                  },
                  "end": {
                    "line": 16,
                    "col": 13
                  }
                },
                "left": {
                  "type": "Identifier",
                  "loc": {
                    "start": {
                      "line": 16,
                      "col": 7
                    },
                    "end": {
                      "line": 16,
                      "col": 8
                    }
                  },
                  "name": "i"
                },
                "operator": "<=",
                "right": {
                  "type": "Literal",
                  "loc": {
                    "start": {
                      "line": 16,
                      "col": 10
                    },
                    "end": {
                      "line": 16,
                      "col": 13
                    }
                  },
                  "value": "100"
                }
              },
              "body": {
                "type": "BlockStatement",
                "loc": {
                  "start": {
                    "line": 17,
                    "col": 1
                  },
                  "end": {
                    "line": 19,
                    "col": 2
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "loc": {
                      "start": {
                        "line": 18,
                        "col": 1
                      },
                      "end": {
                        "line": 18,
                        "col": 7
                      }
                    },
                    "expression": {
                      "type": "AssignStatement",
                      "loc": {
                        "start": {
                          "line": 18,
                          "col": 1
                        },
                        "end": {
                          "line": 18,
                          "col": 7
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "loc": {
                          "start": {
                            "line": 18,
                            "col": 1
                          },
                          "end": {
                            "line": 18,
                            "col": 2
                          }
                        },
                        "name": "i"
                      },
                      "right": {
                        "type": "BinaryExpression",
                        "loc": {
                          "start": {
                            "line": 18,
                            "col": 3
                          },
                          "end": {
                            "line": 18,
                            "col": 6
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "loc": {
                            "start": {
                              "line": 18,
                              "col": 3
                            },
                            "end": {
                              "line": 18,
                              "col": 4
                            }
                          },
                          "name": "j"
                        },
                        "operator": "*",
                        "right": {
                          "type": "Literal",
                          "loc": {
                            "start": {
                              "line": 18,
                              "col": 5
                            },
                            "end": {
                              "line": 18,
                              "col": 6
                            }
                          },
                          "value": "2"
                        }
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 20,
                "col": 1
              },
              "end": {
                "line": 20,
                "col": 10
              }
            },
            "expression": {
              "type": "ReturnStatement",
              "loc": {
                "start": {
                  "line": 20,
                  "col": 1
                },
                "end": {
                  "line": 20,
                  "col": 10
                }
              },
              "argument": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 20,
                    "col": 8
                  },
                  "end": {
                    "line": 20,
                    "col": 9
                  }
                },
                "name": "i"
              }
            }
          }
        ]
      }
    },
    {
      "type": "FunctionDeclaration",
      "loc": {
        "start": {
          "line": 22,
          "col": 1
        },
        "end": {
          "line": 26,
          "col": 2
        }
      },
      "id": {
        "type": "Identifier",
        "loc": {
          "start": {
            "line": 22,
            "col": 5
          },
          "end": {
            "line": 22,
            "col": 9
          }
        },
        "name": "demo"
      },
      "kind": "int",
      "params": [
        {
          "type": "Identifier",
          "loc": {
            "start": {
              "line": 22,
              "col": 10
            },
            "end": {
              "line": 22,
              "col": 15
            }
          },
          "id": {
            "type": "Identifier",
            "loc": {
              "start": {
                "line": 22,
                "col": 14
              },
              "end": {
                "line": 22,
                "col": 15
              }
            },
            "name": "a"
          },
          "kind": "int"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "loc": {
          "start": {
            "line": 23,
            "col": 1
          },
          "end": {
            "line": 26,
            "col": 2
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 24,
                "col": 1
              },
              "end": {
                "line": 24,
                "col": 7
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 24,
                  "col": 1
                },
                "end": {
                  "line": 24,
                  "col": 7
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 24,
                    "col": 1
                  },
                  "end": {
                    "line": 24,
                    "col": 2
                  }
                },
                "name": "a"
              },
              "right": {
                "type": "BinaryExpression",
                "loc": {
                  "start": {
                    "line": 24,
                    "col": 3
                  },
                  "end": {
                    "line": 24,
                    "col": 6
                  }
                },
                "left": {
                  "type": "Identifier",
                  "loc": {
                    "start": {
                      "line": 24,
                      "col": 3
                    },
                    "end": {
                      "line": 24,
                      "col": 4
                    }
                  },
                  "name": "a"
                },
                "operator": "+",
                "right": {
                  "type": "Literal",
                  "loc": {
                    "start": {
                      "line": 24,
                      "col": 5
                    },
                    "end": {
                      "line": 24,
                      "col": 6
                    }
                  },
                  "value": "2"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 25,
                "col": 1
              },
              "end": {
                "line": 25,
                "col": 12
              }
            },
            "expression": {
              "type": "ReturnStatement",
              "loc": {
                "start": {
                  "line": 25,
                  "col": 1
                },
                "end": {
                  "line": 25,
                  "col": 12
                }
              },
              "argument": {
                "type": "BinaryExpression",
                "loc": {
                  "start": {
                    "line": 25,
                    "col": 8
                  },
                  "end": {
                    "line": 25,
                    "col": 11
                  }
                },
                "left": {
                  "type": "Identifier",
                  "loc": {
                    "start": {
                      "line": 25,
                      "col": 8
                    },
                    "end": {
                      "line": 25,
                      "col": 9
                    }
                  },
                  "name": "a"
                },
                "operator": "*",
                "right": {
                  "type": "Literal",
                  "loc": {
                    "start": {
                      "line": 25,
                      "col": 10
                    },
                    "end": {
                      "line": 25,
                      "col": 11
                    }
                  },
                  "value": "2"
                }
              }
            }
          }
        ]
      }
    },
    {
      "type": "FunctionDeclaration",
      "loc": {
        "start": {
          "line": 28,
          "col": 1
        },
        "end": {
          "line": 38,
          "col": 2
        }
      },
      "id": {
        "type": "Identifier",
        "loc": {
          "start": {
            "line": 28,
            "col": 6
          },
          "end": {
            "line": 28,
            "col": 10
          }
        },
        "name": "main"
      },
      "kind": "void",
      "params": [],
      "body": {
        "type": "BlockStatement",
        "loc": {
          "start": {
            "line": 29,
            "col": 1
          },
          "end": {
            "line": 38,
            "col": 2
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "loc": {
              "start": {
                "line": 30,
                "col": 1
              },
              "end": {
                "line": 30,
                "col": 7
              }
            },
            "id": {
              "type": "Identifier",
              "loc": {
                "start": {
                  "line": 30,
                  "col": 5
                },
                "end": {
                  "line": 30,
                  "col": 6
                }
              },
              "name": "a"
            },
            "kind": "int"
          },
          {
            "type": "VariableDeclaration",
            "loc": {
              "start": {
                "line": 31,
                "col": 1
              },
              "end": {
                "line": 31,
                "col": 7
              }
            },
            "id": {
              "type": "Identifier",
              "loc": {
                "start": {
                  "line": 31,
                  "col": 5
                },
                "end": {
                  "line": 31,
                  "col": 6
                }
              },
              "name": "b"
            },
            "kind": "int"
          },
          {
            "type": "VariableDeclaration",
            "loc": {
              "start": {
                "line": 32,
                "col": 1
              },
              "end": {
                "line": 32,
                "col": 7
              }
            },
            "id": {
              "type": "Identifier",
              "loc": {
                "start": {
                  "line": 32,
                  "col": 5
                },
                "end": {
                  "line": 32,
                  "col": 6
                }
              },
              "name": "c"
            },
            "kind": "int"
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 33,
                "col": 1
              },
              "end": {
                "line": 33,
                "col": 5
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 33,
                  "col": 1
                },
                "end": {
                  "line": 33,
                  "col": 5
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 33,
                    "col": 1
                  },
                  "end": {
                    "line": 33,
                    "col": 2
                  }
                },
                "name": "a"
              },
              "right": {
                "type": "Literal",
                "loc": {
                  "start": {
                    "line": 33,
                    "col": 3
                  },
                  "end": {
                    "line": 33,
                    "col": 4
                  }
                },
                "value": "3"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 34,
                "col": 1
              },
              "end": {
                "line": 34,
                "col": 5
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 34,
                  "col": 1
                },
                "end": {
                  "line": 34,
                  "col": 5
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 34,
                    "col": 1
                  },
                  "end": {
                    "line": 34,
                    "col": 2
                  }
                },
                "name": "b"
              },
              "right": {
                "type": "Literal",
                "loc": {
                  "start": {
                    "line": 34,
                    "col": 3
                  },
                  "end": {
                    "line": 34,
                    "col": 4
                  }
                },
                "value": "4"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 35,
                "col": 1
              },
              "end": {
                "line": 35,
                "col": 5
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 35,
                  "col": 1
                },
                "end": {
                  "line": 35,
                  "col": 5
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 35,
                    "col": 1
                  },
                  "end": {
                    "line": 35,
                    "col": 2
                  }
                },
                "name": "c"
              },
              "right": {
                "type": "Literal",
                "loc": {
                  "start": {
                    "line": 35,
                    "col": 3
                  },
                  "end": {
                    "line": 35,
                    "col": 4
                  }
                },
                "value": "2"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 36,
                "col": 1
              },
              "end": {
                "line": 36,
                "col": 24
              }
            },
            "expression": {
              "type": "AssignStatement",
              "loc": {
                "start": {
                  "line": 36,
                  "col": 1
                },
                "end": {
                  "line": 36,
                  "col": 24
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "loc": {
                  "start": {
                    "line": 36,
                    "col": 1
                  },
                  "end": {
                    "line": 36,
                    "col": 2
                  }
                },
                "name": "a"
              },
              "right": {
                "type": "CallExpression",
                "loc": {
                  "start": {
                    "line": 36,
                    "col": 3
                  },
                  "end": {
                    "line": 36,
                    "col": 23
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "loc": {
                    "start": {
                      "line": 36,
                      "col": 3
                    },
                    "end": {
                      "line": 36,
                      "col": 10
                    }
                  },
                  "name": "program"
                },
                "args": [
                  {
                    "type": "Identifier",
                    "loc": {
                      "start": {
                        "line": 36,
                        "col": 11
                      },
                      "end": {
                        "line": 36,
                        "col": 12
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "loc": {
                      "start": {
                        "line": 36,
                        "col": 13
                      },
                      "end": {
                        "line": 36,
                        "col": 14
                      }
                    },
                    "name": "b"
                  },
                  {
                    "type": "CallExpression",
                    "loc": {
                      "start": {
                        "line": 36,
                        "col": 15
                      },
                      "end": {
                        "line": 36,
                        "col": 22
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "loc": {
                        "start": {
                          "line": 36,
                          "col": 15
                        },
                        "end": {
                          "line": 36,
                          "col": 19
                        }
                      },
                      "name": "demo"
                    },
                    "args": [
                      {
                        "type": "Identifier",
                        "loc": {
                          "start": {
                            "line": 36,
                            "col": 20
                          },
                          "end": {
                            "line": 36,
                            "col": 21
                          }
                        },
                        "name": "c"
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "loc": {
              "start": {
                "line": 37,
                "col": 1
              },
              "end": {
                "line": 37,
                "col": 8
              }
            },
            "expression": {
              "type": "ReturnStatement",
              "loc": {
                "start": {
                  "line": 37,
                  "col": 1
                },
                "end": {
                  "line": 37,
                  "col": 8
                }
              },
              "argument": null
            }
          }
        ]
      }
    }
  ]
}
export {ast};